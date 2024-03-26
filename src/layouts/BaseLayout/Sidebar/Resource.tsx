import { Resource as ResourceType } from "@/types/resources";

type ResourceProps = { resource: ResourceType | undefined };
export default function Resource({ resource }: ResourceProps) {
  if (!resource) return null;

  return (
    <div className="ml-4">
      <h3>{resource.name}</h3>
    </div>
  );
}
