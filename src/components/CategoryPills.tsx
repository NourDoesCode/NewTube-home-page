import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;
export default function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [isLeftVisible, setIsLeftVisible] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(true);
  const [translate, setTranslate] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div
      className="overflow-x-hidden relative overflow-y-hidden pt-3"
      ref={containerRef}
    >
      <div
        className="flex gap-4 whitespace-nowrap transition-transform w-[max-content] "
        style={{
          transform: `translateX(-${translate}px)`,
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`
              px-3 py-1 rounded-lg whitespace-nowrap transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "hover:bg-gray-300 bg-gray-200 text-black/80"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full flex items-center justify-center">
          <button
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) {
                  return 0;
                }
                return newTranslate;
              });
            }}
            className="hover:bg-gray-200 p-2 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex items-center justify-center">
          <button
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
            className="hover:bg-gray-200 p-2 rounded-full flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
