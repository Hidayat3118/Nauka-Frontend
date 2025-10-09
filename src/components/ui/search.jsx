import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
const Search = ({placeholder}) => {
  return (
    <div className="relative flex items-center ">
      <Input
        className="lg:w-sm bg-[#2A2A2A] py-6 lg:py-6 rounded-full pl-12 lg:pl-14 text-base lg:text-lg"
        placeholder={placeholder}
      />
      <IoSearch className="text-white text-2xl lg:text-3xl font-bold absolute left-3  " />
    </div>
  );
};

export default Search;