type FilterBarProps = {
  selectedLanguage: string;
  selectedRating: string;
  selectedYear: string;
  onLanguageChange: (language: string) => void;
  onRatingChange: (rating: string) => void;
  onYearChange: (year: string) => void;
};

export default function FilterBar({
  selectedLanguage,
  selectedRating,
  selectedYear,
  onLanguageChange,
  onRatingChange,
  onYearChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-10">
      {/* Language Filter */}
      <select
        value={selectedLanguage}
        className="rounded-xl border border-[#CBBDDB] px-4 py-3 shadow-md bg-white text-[#322442] focus:outline-none focus:ring-2 focus:ring-[#7D59A6] cursor-pointer"
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">Language (All)</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="ja">Japanese</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
      </select>

      {/* Rating Filter */}
      <select
        value={selectedRating}
        className="rounded-xl border border-[#CBBDDB] px-4 py-3 shadow-md bg-white text-[#322442] focus:outline-none focus:ring-2 focus:ring-[#7D59A6] cursor-pointer"
        onChange={(e) => onRatingChange(e.target.value)}
      >
        <option value="">Rating (All)</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>

      {/* Release Year Filter */}
      <select
        value={selectedYear}
        className="rounded-xl border border-[#CBBDDB] px-4 py-3 shadow-md bg-white text-[#322442] focus:outline-none focus:ring-2 focus:ring-[#7D59A6] cursor-pointer"
        onChange={(e) => onYearChange(e.target.value)}
      >
        <option value="">Release Year (All)</option>
        <option value="2020">2020+</option>
        <option value="2010">2010+</option>
        <option value="2000">2000+</option>
        <option value="1990">1990+</option>
      </select>
    </div>
  );
}