import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { cardEnvironment } from '../../config/keys/card.config';
import { companyEnvironment } from '../../config/keys/company.config';
import { AddressEntity } from './entities/address.entity';
import { IClick2mailRequestCreateAccount } from './interfaces/IClick2mailRequestCreateAccount';
import { IClick2mailRequestCreateAddress } from './interfaces/IClick2mailRequestCreateAddress';
import { IClick2mailRequestCreateAddressList } from './interfaces/IClick2mailRequestCreateAddressList';
import { IClick2mailRequestCreateJob } from './interfaces/IClick2mailRequestCreateJob';
import { IClick2mailRequestUpdateAddress } from './interfaces/IClick2mailRequestUpdateAddress';
import { IClick2mailRequestUploadDocument } from './interfaces/IClick2mailRequestUploadDocument';

@Injectable()
export class Click2mailApi {
  // xmlParser = new XMLParser({ ignoreAttributes: false, parseAttributeValue: true });
  private readonly logger = new Logger(Click2mailApi.name);

  constructor(
    @Inject(companyEnvironment.KEY)
    private readonly companyEnv: ConfigType<typeof companyEnvironment>,
    @Inject(cardEnvironment.KEY)
    private readonly cardEnv: ConfigType<typeof cardEnvironment>,
    private httpService: HttpService,
  ) {}

  purchaseCredit(amount: number) {
    return lastValueFrom(
      this.httpService
        .post<{
          balance: null;
          description: 'Success';
          status: '0' | '1';
          statusUrl: 'https://stage-rest.click2mail.com/credit';
          allowNegative: boolean;
        }>(
          '/molpro/credit/purchase',
          {},
          {
            params: {
              billingName: this.companyEnv.name,
              billingAddress1: this.companyEnv.address,
              billingCity: this.companyEnv.city,
              billingState: this.companyEnv.state,
              billingZip: this.companyEnv.zip,
              billingAmount: amount.toString(),
              billingNumber: this.cardEnv.number,
              billingMonth: this.cardEnv.month,
              billingYear: this.cardEnv.year,
              billingCvv: this.cardEnv.cvv,
              billingCcType: this.cardEnv.ccType,
            },
          },
        )
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  uploadDocument({ fileUrl, documentFormat, documentClass, documentName }: IClick2mailRequestUploadDocument) {
    // const { data: fileData } = await this.httpService.axiosRef.get(fileUrl, { responseType: 'stream' });
    // const blob = new Blob([fileData], { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('documentFormat', documentFormat);
    formData.append('documentName', documentName);
    formData.append('documentClass', documentClass);
    formData.append('url', fileUrl);
    return lastValueFrom(
      this.httpService
        .post<{
          id: string;
          status: string;
          description: string;
          pages: string;
        }>('/molpro/documents/url', formData)
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  createAddressList({
    addressListName,
    firstname,
    lastname,
    organization,
    address1,
    address2,
    address3,
    city,
    state,
    postalcode,
  }: IClick2mailRequestCreateAddressList) {
    return lastValueFrom(
      this.httpService
        .post<{
          id: number;
          status: number;
          description: string;
          statusLocation: string;
          count: string;
          addressListsInfo: string;
        }>(
          '/molpro/addressLists',
          `
          <addressList>
            <addressListName>${addressListName}</addressListName>
            <addressMappingId>1</addressMappingId>
            <addresses>
              <address>
                <Firstname>${firstname}</Firstname>
                <Lastname>${lastname}</Lastname>
                <Organization>${organization}</Organization>
                <Address1>${address1}</Address1>
                <Address2>${address2}</Address2>
                <Address3>${address3}</Address3>
                <City>${city}</City>
                <State>${state}</State>
                <Postalcode>${postalcode}</Postalcode>
                <Country></Country>
              </address>
            </addresses>
          </addressList>
        `,
          { headers: { 'Content-Type': 'application/xml' } },
        )
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  createJob(params: IClick2mailRequestCreateJob) {
    return lastValueFrom(
      this.httpService
        .post<{
          id: string;
          status: string;
          description: string;
          statusUrl: string;
        }>('/molpro/jobs', null, { params })
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  submitJob(jobId: string) {
    return lastValueFrom(
      this.httpService
        .post<{
          id: string;
          status: string;
          description: string;
          statusUrl: string;
          cost: string;
        }>(`/molpro/jobs/${jobId}/submit?billingType=User Credit`)
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  checkJobStatus(jobId: string) {
    return lastValueFrom(
      this.httpService
        .get<{
          id: string;
          status: string;
          description: string;
          statusUrl: string;
        }>(`/molpro/jobs/${jobId}`)
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  checkJobTracking(jobId: string) {
    return lastValueFrom(
      this.httpService
        .get<{
          id: string;
          status: string;
          description: string;
          statusUrl: string;
        }>(`/molpro/jobs/${jobId}/tracking?trackingType=IMB`)
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  getAddressList(addressType: string) {
    return lastValueFrom(
      this.httpService.get<{ addresses: AddressEntity }>('/molpro/account/addresses', { params: { addressType } }).pipe(
        map((resp) => resp.data.addresses),
        catchError((e) => {
          this.logger.error(e);
          throw new HttpException(e.response.data, e.response.status);
        }),
      ),
    );
  }

  getCredits() {
    return lastValueFrom(
      this.httpService
        .get<{
          data: {
            balance: string;
            description: string;
            status: string;
            statusUrl: string;
            allowNegative: string;
          };
        }>('/molpro/credit')
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  registerAccount(params: IClick2mailRequestCreateAccount) {
    return lastValueFrom(
      this.httpService
        .post<{
          data: {
            description: string;
            status: string;
            paymentMethods: string;
            crid: string;
            addresses: string;
            username: string;
            sessionId: string;
          };
        }>('/molpro/account/create', null, { params })
        .pipe(
          map((resp) => resp.data),
          catchError((e) => {
            this.logger.error(e);
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
    );
  }

  updateAddress(addressId: string, params: IClick2mailRequestUpdateAddress) {
    return lastValueFrom(
      this.httpService.post<{ addresses: AddressEntity }>(`/molpro/account/addresses/${addressId}`, null, { params }).pipe(
        map((resp) => resp.data.addresses),
        catchError((e) => {
          this.logger.error(e);
          throw new HttpException(e.response.data, e.response.status);
        }),
      ),
    );
  }

  createAddress(params: IClick2mailRequestCreateAddress) {
    return lastValueFrom(
      this.httpService.post<{ addresses: AddressEntity }>('/molpro/account/addresses', null, { params }).pipe(
        map((resp) => resp.data.addresses),
        catchError((e) => {
          this.logger.error(e);
          throw new HttpException(e.response.data, e.response.status);
        }),
      ),
    );
  }
}
