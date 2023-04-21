import { Divider } from "@mantine/core";
import Skeleton, { SkeletonProvider } from "./UI/Skeleton";

export default function CollectionRowCard({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) {
  return (
    <SkeletonProvider contextProps={{ mt: "0px", mr: "10px" }}>
      <div
        className="
         transition-all cursor-pointer
         rounded-2xl
         p-3
         flex flex-col md:flex-row gap-4
         border border-dashed border-neutral-700
         hover:border-primary
        "
      >
        <Skeleton>
            <div className=" w-28 h-28">
                <img src={image} className="object-cover rounded-2xl w-full h-full" />
            </div>
        </Skeleton>
        <div className="flex flex-col justify-center">
          <Skeleton>
            <h5 className="font-semibold text-xl">{title}</h5>
          </Skeleton>
          <Skeleton>
            <p className="text-sm text-neutral-400">{description}</p>
          </Skeleton>
        </div>
      </div>
    </SkeletonProvider>
  );
}
