import AppModel from "../../../models/AppModel";
import {pluck} from "../../../utils/pluck";
import AppModelType from "../../../models/AppModel.types";
import {Op} from "sequelize";


export async function find(options?: object) {
  const data = await AppModel.findAll(options);
  return pluck<AppModelType[]>(data);
}

export async function findByName(name:string, limit: number) {
  if (name) {
    return await find({
      where: { name: { [Op.like]: `%${name}%` } },
      limit: limit,
    });
  } else {
    return [];
  }
}

export async function findAll(): Promise<Array<AppModelType> | null> {
  return await find();
}

// export async function findById(arg: ApiIpType) {
//   const app: AppModelType | null = pluck(await AppModel.findByPk<any>(arg.payload));
//   //await sleep(1000);
//   if (app && !app.header_image) {
//     const appdetails = await getapp(arg.payload);
//
//     if (appdetails) {
//       app.header_image = appdetails.header_image;
//       await AppModel.update(
//         { header_image: appdetails.header_image },
//         {
//           where: { id: arg.payload },
//         }
//       );
//     }
//   }
//   return app;
// }
