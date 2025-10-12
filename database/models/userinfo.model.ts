import { Document, Model, models, Schema, model } from "mongoose";

export interface UserInfoItem extends Document {
  userId: string;
  name: string;
  email: string;
  subscribe: boolean;
  country: string;
  investmentGoals: string;
  riskTolerance: string;
  preferredIndustry: string;
}

const UserInfoSchema = new Schema<UserInfoItem>(
  {
    userId: { type: String, required: true, index: true },
    email: { type: String, required: true, trim: true },
    subscribe: { type: Boolean, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    investmentGoals: { type: String, required: true, trim: true },
    riskTolerance: { type: String, required: true, trim: true },
    preferredIndustry: { type: String, required: true, trim: true },
  },
  { timestamps: false },
);

const UserInfo: Model<UserInfoItem> =
  (models?.UserInfo as Model<UserInfoItem>) || model<UserInfoItem>("UserInfo", UserInfoSchema);

export default UserInfo;
