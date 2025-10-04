import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
const Search = ({placeholder}) => {
  return (
    <div className="relative flex items-center mt-20 max-w-6xl w-full">
      <Input
        className="lg:w-sm bg-gray-800 py-6 lg:py-6 rounded-full pl-12 lg:pl-14 text-base lg:text-xl"
        placeholder={placeholder}
      />
      <IoSearch className="text-white text-2xl lg:text-3xl font-bold absolute left-3  " />
    </div>
  );
};

export default Search;