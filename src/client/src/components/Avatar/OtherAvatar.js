import React, { useEffect, useRef, useState } from "react";
import AvatarDialog from "./AvatarDialog";
import { generalDialog } from "../GameLogic/constants";
import { avatarNames, avatarDescription } from "../GameLogic/constants";
import { GameLogic } from "../GameLogic/GameLogic";
const OtherAvatar = (props) => {
  let statement = GameLogic.GenerateStatistics.generateGeneralStatement();
  return <div>{<AvatarDialog statement={statement} {...props} />}</div>;
};
export default OtherAvatar;
