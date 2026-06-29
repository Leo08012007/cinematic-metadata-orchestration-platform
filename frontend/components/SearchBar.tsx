type Props = {
  value: string;
  onSearch: (value: string) => void;
};

export default function SearchBar({
  value,
  onSearch,
}: Props) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-10">

      <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="🔍 Search movies..."
        className="
          w-full
          rounded-full
          px-6
          py-4
          text-lg
          shadow-lg
          border
          border-[#CBBDDB]
          focus:outline-none
          focus:ring-2
          focus:ring-[#7D59A6]
        "
      />

    </div>
  );
}