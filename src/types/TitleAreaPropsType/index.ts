import { SettlementAreaPropsType } from "src/types";

interface TitleAreaPropsType extends Pick<SettlementAreaPropsType, "isCheckFull" | "handleCheckFull"> {}
export default TitleAreaPropsType;
