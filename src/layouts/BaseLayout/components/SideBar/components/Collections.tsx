import type { Collection } from "../../../../../models/collection";
import { Collection as CollectionModel } from "../../../../../models/collection";
import { Resource as ResourceModel } from "../../../../../models/resource";
import styles from "../SideBar.module.scss";
import Resource from "./Resource";

type CollectionItemProps = { collection: Collection };
const CollectionItem = ({ collection }: CollectionItemProps) => {
  const handleDeleteClick = async () => {
    await CollectionModel.delete(collection.id);
    collection.resources.forEach(async (resource) => {
      await ResourceModel.delete(resource.id);
    });
  };

  return (
    <div>
      <div className={styles.row}>
        <div>
          <h2>{collection.name}</h2>
        </div>
        <div className={styles.buttons} onClick={handleDeleteClick}>
          {/* <CiCircleRemove size={15} /> */}
        </div>
      </div>
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
