import { db } from "@/lib/db";

async function main(){
    try {
        const insert=await db.match.create({
            data:{
                round:"Round64",
                type:"MixedDouble",
                date: new Date(),
                score1: [21,19,23],
                score2: [19,21,21],
                umpire: "a",
                players1:["a","b"],
                players2:["c","d"],
                organization:"FTSL",
            }
        })

        // const update=await db.match.update({
        //     where:{
        //         id:"cluh1et6q0000132eh26r6aqd",
        //     },
        //     data:{
        //         score:[]
        //     }
        // })

        const data=await db.match.findMany({
            // select:{
            //     id:true,
            //     score:true
            // }
        })

        console.log(insert);
        // console.log(update);
        // console.log(data)
        // for (let i = 0; i < data.length; i++) {
        //     const element = data[i].score;
        //     console.log(element)
        // }
        
    } catch (error) {
        console.error("Failed to insert match:", error);
    }
}

main()