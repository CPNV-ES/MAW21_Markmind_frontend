import { useEffect, useState } from "react";
import style from "./commandSuggestion.module.scss";

export default function CommandSuggestion({
  command,
  onSelect,
  onClose,
  position,
}) {
  const commands = [{ trigger: "divider", markdown: "-----" }];

  const [filteredCommands, setFilteredCommands] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Filtrer les commandes basées sur l'entrée de l'utilisateur.
    const newFilteredCommands = commands.filter((c) =>
      c.trigger.startsWith(command)
    );
    setFilteredCommands(newFilteredCommands);
    setSelectedIndex(0); // Réinitialiser la sélection à chaque nouvelle commande.
  }, [command]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && filteredCommands.length > 0) {
        onSelect(filteredCommands[selectedIndex].markdown);
      } else if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredCommands.length - 1)
        );
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredCommands, selectedIndex, onSelect, onClose]);

  return (
    <ul
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: 1,
      }}
      className={style.commandSuggestions}
    >
      {filteredCommands.map((cmd, index) => (
        <li key={index} onClick={() => onSelect(cmd.markdown)}>
          {cmd.trigger}
        </li>
      ))}
    </ul>
  );
}
