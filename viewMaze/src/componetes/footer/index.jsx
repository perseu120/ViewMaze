import { useMemo } from "react";
import { useGlobalContext } from "../../context/Context";


export default function Footer() {

    const {page, setPage} = useGlobalContext();
    const buttonPageList = useMemo(()=>{

        const aux = [];
        for(let i = 1; i <= 5; i++){
            if(page-i > 0 ){
                aux.unshift({value:page-i, label:page-i+1});
            }
        };
        aux.push({value:page, label:page+1});

        for(let i = 1; i <= 5; i++){
            
            aux.push({value:page+i, label:page+i+1});
            
        };

        console.log(page);
        return aux;

    },[page]);

    function handleNextPage(){
        setPage(page+1);
    }
    function handlePreviousPage(){

        if(page > 0 ){
            setPage(page-1);
        }
    }


    return (
        <>
            <div className="fixed bottom-0 left-0 w-full bg-[#0c0b0b] text-white text-center py-3 flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6 bg-[#0c0b0b]">
              
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md">
                            <button onClick={ handlePreviousPage } className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Previous</span>
                                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                                    <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
                                </svg>
                            </button>
                            
                            {
                                buttonPageList.length && buttonPageList.map((button)=>{
                                    return <button key={button.value} onClick={()=>setPage(button.value)} aria-current="page" className={`relative z-10 inline-flex items-center bg-[#0c0b0b] px-4 py-2 text-sm font-semibold text-white ${ page == button.value && "border-solid border-purple-500 border-4"}`}>{button?.label}</button>
                                })
                            }
                            
                            
                            <button onClick={ handleNextPage } className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Next</span>
                                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                                    <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>

    );
}