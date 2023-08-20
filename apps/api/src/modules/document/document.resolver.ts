import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { AwsS3 } from '../aws/aws.s3';
import { extToContentType } from '../aws/misc/extToContentType';
import { EFirmPermission } from '../user/enums/EFirmPermission';
import { ELobbymaticPermission } from '../user/enums/ELobbymaticPermission';
import { DocumentIdArg } from './args/DocumentIdArg';
import { GetDocumentArgs } from './args/GetDocumentArgs';
import { GetDocumentSignedUrlArgs } from './args/GetDocumentSignedUrlArgs';
import { DocumentEntity, DocumentTokenEntity } from './document.entity';

@Resolver(() => DocumentEntity)
@UseGuards(BasicAuthGuard)
export class DocumentResolver {
  constructor(
    @InjectRepository(DocumentEntity) private readonly documentRepo: Repository<DocumentEntity>,
    @InjectRepository(DocumentTokenEntity) private readonly documentTokenRepo: Repository<DocumentTokenEntity>,
    private readonly s3: AwsS3,
  ) {}

  @ResolveField(() => String)
  url(@Parent() doc: DocumentEntity) {
    return DocumentEntity.getAwsUrl(doc);
  }

  @Query(() => [DocumentEntity])
  async getDocuments(@UserPassport() { firmId }: IUserPassport, @Args() { workspaceId, clientId, skip, take }: GetDocumentArgs) {
    return this.documentRepo.find({ where: { firmId, workspaceId, clientId }, skip, take });
  }

  @Mutation(() => String)
  async getDocumentSignedUrl(
    @UserPassport() { userId, firmId }: IUserPassport,
    @Args() { displayName, workspaceId, clientId, hash, ext }: GetDocumentSignedUrlArgs,
  ) {
    const token = await this.documentTokenRepo.save(
      this.documentTokenRepo.create({
        eS3Bucket: this.s3.eS3Bucket,
        displayName,
        userId,
        firmId,
        workspaceId,
        clientId,
        hash,
        ext,
      }),
    );
    return this.s3.getSignedUrl({ Key: token.getAwsKey(), ContentType: extToContentType[ext] });
  }

  @Mutation(() => DocumentEntity)
  async createDocument(@UserPassport() { userId }: IUserPassport) {
    const token = await this.documentTokenRepo.findOneByOrFail({ userId });
    if (!(await this.s3.checkFileExists({ Key: token.getAwsKey() }))) {
      throw new Error('file doesnt exists on AWS');
    }
    const document = await this.documentRepo.save(token);
    await this.documentTokenRepo.delete({ userId });
    return document;
  }

  @Mutation(() => String)
  async deleteDocument(
    @UserPassport() { userId, firmPermission, lobbymaticPermission }: IUserPassport,
    @Args() { documentId }: DocumentIdArg,
  ) {
    const doc = await this.documentRepo.findOneByOrFail({ id: documentId });
    if (lobbymaticPermission !== ELobbymaticPermission.Admin && firmPermission !== EFirmPermission.Admin && doc.userId !== userId)
      throw new UnauthorizedException();
    await this.s3.deleteObject({ Key: doc.getAwsKey() });
    await this.documentRepo.delete({ id: documentId });
    return documentId;
  }
}
