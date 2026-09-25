import { NextResponse } from "next/server";
import { listCategories, BigBangApiError } from "@/lib/bigbang";

export async function GET(){
  try{
    const result=await listCategories();
    return NextResponse.json(result,{headers:{"Cache-Control":"public, s-maxage=600, stale-while-revalidate=1800"}});
  }catch(err){
    if(err instanceof BigBangApiError) return NextResponse.json({success:false,error:{code:err.code??err.status,message:err.message}},{status:err.status});
    return NextResponse.json({success:false,error:{code:500,message:"Falha ao buscar categorias."}},{status:500});
  }
}
