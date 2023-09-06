import { registerEnumType } from "@nestjs/graphql";

export enum EVotableOrder {
  ups = "ups",
  ratio = "ratio",
}
registerEnumType(EVotableOrder, { name: "EVotableOrder" });
