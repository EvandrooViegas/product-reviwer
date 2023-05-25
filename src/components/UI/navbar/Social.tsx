import React from "react"
import { iSocial } from "../../../types";
import Skeleton from "../Skeleton";
import Tooltip from "../../Tooltip";

type Props = {
  social: iSocial;
};
export default function Social(props: Props) {
  const { social } = props;
  return (
    <Skeleton key={social.name}>
      <div key={social.link}>
        <a href={social.link} target="_blank" rel="noreferrer">
          <div className="relative">
            <Tooltip shouldShow={true} label={social.name} />
            <img src={social.icon} className="w-7" />
          </div>
        </a>
      </div>
    </Skeleton>
  );
}
