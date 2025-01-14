import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"


interface CategorySortProps {
    categories : string[],
    selectedCategory : string,
    onCategoryChange : (category : string) => void,
   
}


const CategorySort = ({categories , selectedCategory , onCategoryChange} : CategorySortProps) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full text-gray-800 font-medium transition duration-300 ease-in-out transform hover:scale-105 truncate"
                >
                    {selectedCategory ? selectedCategory : "All Categories"}
                    <span><ChevronDown className="w-4 h-4" /></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        key="all"
                        onClick={() => onCategoryChange("")}
                    >All Categories</DropdownMenuItem>

                    {
                        categories.map((category, index) => (
                            <DropdownMenuItem key={index} onClick={() => onCategoryChange(category)}>
                                {category}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default CategorySort