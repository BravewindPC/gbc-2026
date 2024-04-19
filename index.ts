import { db } from "@/lib/db";
import bcrypt from "bcrypt";

async function insertMatchResultsForMemberships(groupId:any) {
    // Retrieve all memberships for the group
    const memberships = await db.groupMembership.findMany({
      where: { groupId: groupId },
      select: { id: true } // Only select the IDs
    });
  
    // Prepare match results data, setting all Int fields to 0
    const matchResultsData = memberships.map(membership => ({
      groupMembershipId: membership.id,
      played: 0,
      win: 0,
      lose: 0,
      setWin: 0,
      setLose: 0,
      scoreGain: 0,
      scoreLose: 0,
      points: 0,
    }));
  
    // Insert match results for each membership
    const matchResults = await db.matchResult.createMany({
      data: matchResultsData,
    });
  
    return matchResults; // This may include a count of inserted records
  }

async function main(){
    try {
        // for (let index = 6; index < 7; index++) {
        //     const insert=await db.match.create({
        //         data:{
        //             number:index+1,
        //             round:"Final",
        //             type:"MenSingle",
        //         }
        //     })

            // const insert=await db.match.create({
            //     data:{
            //         players1:"asd",
            //       },
            //     }
            // })

            // console.log(insert)

      // const group = await db.group.findFirst({ where: { number: 2, type:'MenDouble' } });
      // console.log("group", group)
      // if (group) {
          
      //     const groupmember = await db.groupMembership.findFirst({
      //         where: { 
      //             groupId: group.id,
      //             organization: 'HMS'
      //         }
      //     });

      //     console.log(groupmember)

      //     if (groupmember) {
      //       const matchdata=await db.matchResult.findFirst({
      //           where:{
      //               groupMembershipId:groupmember.id
      //           },
      //       })

      //       console.log(matchdata)
      //   }
      // }
        
        let password = "GBCadmin5*"
        const hashedPassword = await bcrypt.hash(password, 10);
        const update=await db.user.create({
          data:{
            name:"admin5",
            password:hashedPassword,
          }
        })

        // const data=await db.match.findMany({
        //     // select:{
        //     //     id:true,
        //     //     score:true
        //     // }
        // })

        // console.log(insert);
        // console.log(update);
        // console.log(data)
        // for (let i = 0; i < data.length; i++) {
        //     const element = data[i].score;
        //     console.log(element)
        // }

        
          
          // Example usage
          // const group = await db.group.create({
          //   data: {
          //     type: 'MenDouble',
          //     number:1,
          //   },
          // });
          
          // await db.groupMembership.createMany({
          //   data: [
          //     { groupId: group.id, organization: 'HIMATEK' },
          //     { groupId: group.id, organization: 'TPB_FTTM' },
          //     { groupId: group.id, organization: 'HIMA_TG' },
          //     // { groupId: group.id, organization: 'HMH_SELVA' },
          //   ],
          // });

          
          
          // insertMatchResultsForMemberships(group.id).then((result) => console.log(result)).catch((error) => console.error(error));
        

        // await db.matchResult.deleteMany({});

        // await db.groupMembership.deleteMany({});

        // await db.group.deleteMany({});
        
        // const groupMemberships = await db.groupMembership.findMany({
        //   select: {
        //     name: true,
        //     group: {
        //       select: {
        //         id: true,
        //       }
        //     }
        //   }
        // });
    
        // console.log(groupMemberships);
        
    } catch (error) {
        console.error("Failed to insert match:", error);
    }
}

main()


// Insert into match (players1,players2)
// values(
//          select name from groupmembership
//         where match.organization1=groupmembership.organization
//        and match.type=groupmembership.type,
//       select name from groupmembership
//         where match.organization2=groupmembership.organization
//        and match.type=groupmembership.type,
// ).