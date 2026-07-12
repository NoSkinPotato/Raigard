interface ToolbarProps {
  onRotate: () => void;
  onRandomize: () => void;
  onClear: () => void;
}

export default function Toolbar({
  onRotate,
  onRandomize,
  onClear,
}: ToolbarProps) {
  return (
    <div
      className="
        absolute
        right-6
        top-1/2
        -translate-y-1/2

        flex
        flex-col
        gap-3

        rounded-2xl
        bg-white/90
        p-3

        shadow-xl
        backdrop-blur-md
        border
        border-neutral-200
      "
    >
      <ToolbarButton
        icon="/icons/rotate.svg"
        label="Rotate"
        onClick={onRotate}
      />

      <ToolbarButton
        icon="/icons/randomize.svg"
        label="Randomize"
        onClick={onRandomize}
      />

      <ToolbarButton
        icon="/icons/clear.svg"
        label="Clear"
        onClick={onClear}
      />
    </div>
  );
}

interface ToolbarButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

function ToolbarButton({
  icon,
  label,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="
        group

        flex
        h-14
        w-14

        items-center
        justify-center

        rounded-xl

        transition-all
        duration-200

        hover:bg-neutral-100
        hover:scale-105

        active:scale-95
      "
    >
      <img
        src={icon}
        alt={label}
        className="
          h-6
          w-6

          transition
          group-hover:scale-110
        "
      />
    </button>
  );
}