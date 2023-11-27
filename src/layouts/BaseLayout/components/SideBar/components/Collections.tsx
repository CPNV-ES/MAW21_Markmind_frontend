import Resource from "./Resource";
import type { ResourceProps } from "./Resource";

type Collection = { name: string; id: string; resources: ResourceProps[] };
type CollectionItemProps = { collection: Collection };
const CollectionItem = ({ collection }: CollectionItemProps) => {
  return (
    <div>
      <h2>{collection.name}</h2>
      {collection.resources.map((resource) => {
        return (
          <Resource name={resource.name} id={resource.id} key={resource.id} />
        );
      })}
    </div>
  );
};

type CollectionsProps = { collections: Collection[] };
export default function Collections({ collections }: CollectionsProps) {
  return (
    <div>
      {collections.map((collection) => {
        return <CollectionItem collection={collection} key={collection.id} />;
      })}
    </div>
  );
}
