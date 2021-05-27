import { registerEnumType } from "@nestjs/graphql";

export enum TinderGenderEnum {
  MALE = "MALE",
  FEMAILE = "FEMALE",
  ALL = "ALL",
}

registerEnumType(TinderGenderEnum, {
  name: "TinderGenderEnum",
});
