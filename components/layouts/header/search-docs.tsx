import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"

import { Lead } from "@/components/typo"
import { extractPages } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import sideBarData from "@/configs/docs.json"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export const SearchDocs = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [results, setResults] = useState<DocPage[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allPages = extractPages(sideBarData);
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.trim() === "") {
      setResults([]);
      setOpen(false);
      return;
    }

    const searchTerm = newValue.toLowerCase();
    const filtered = allPages.filter(page => {
      return (
        (page.title?.toLowerCase().includes(searchTerm) || false) ||
        (page.description?.toLowerCase().includes(searchTerm) || false) ||
        (page.url?.toLowerCase().includes(searchTerm) || false)
      );
    });

    setResults(filtered);
    setOpen(filtered.length > 0);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="grow w-auto md:w-[200px] xl:w-[240px] md:grow-0 relative bg-foreground/5 rounded-md overflow-hidden">
          <Input
            placeholder="Search docs..."
            value={value}
            onChange={handleInputChange}
            className=" pl-4 border-0 rounded-md h-10"

          />
          <Search className="absolute right-2 top-2.5 h-4 w-4 text-foreground/80" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[350px] min-h-[250px] max-h-[500px] p-0 bg-foreground/10 backdrop-blur-lg border-foreground/30 overflow-hidden"
        align="end"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {results.length > 0 ? (
          <div className="h-full overflow-x-auto py-2">
            {results.map((doc) => (
              <Link
                key={doc.url}
                href={doc.url}
                className="flex flex-col w-full pl-4 cursor-pointer text-foreground px-4 py-3 hover:bg-foreground/10 border-b border-foreground/10"
                onClick={() => {
                  setValue(doc.title);
                  setOpen(false);
                }}
              >
                {doc.parent && <span className="bg-foreground/10 p-1 mb-1 px-2 rounded-md text-xs w-max">{doc.parent.title}</span>}
                <Lead className="underline text-[15px] xl:text-[16px]">{doc.title}</Lead>
                <p className="text-sm text-foreground/70">{doc.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="p-4 text-sm text-foreground/60">No results found.</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
