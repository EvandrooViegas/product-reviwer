import Tooltip from "../Tooltip";
import { iSocial } from "../../../types";
import Skeleton from "../Skeleton";

type Props = {
  social: iSocial;
};
export default function Social(props: Props) {
  const { social } = props;
  return (
    <Skeleton key={social.name}>
      <div key={social.link}>
        <a href={social.link} target="_blank">
          <Tooltip color="gray" withArrow label={social.name}>
            <img src={social.icon} className="w-8" />
          </Tooltip>
        </a>
      </div>
    </Skeleton>
  );
}
