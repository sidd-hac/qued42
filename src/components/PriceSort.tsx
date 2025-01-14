import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"


interface PriceSortProps {

    sortBy: string;
    onSortChange: (sort: string) => void;
}

const PriceSort = (
    { sortBy, onSortChange }: PriceSortProps
) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full text-gray-800 font-medium transition duration-300 ease-in-out transform hover:scale-105 truncate"
                >
                    {sortBy ? sortBy : "sort by"}
                    <span><ChevronDown className="w-4 h-4" /></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>


                    <DropdownMenuItem
                        onClick={() => onSortChange("")}
                    >
                        Sort by
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onSortChange("price-low")}
                    >
                        Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSortChange("price-high")}
                    >
                        Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSortChange("rating")}
                    >
                        Rating
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default PriceSort