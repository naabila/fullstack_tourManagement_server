import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { divisionRoutes } from "../modules/division/division.route";
import { TourRoutes } from "../modules/tour/tour.route";

export const router=Router();
const moduleRoutes=[
    {
        path:"/users",
        route:UserRoutes
    },
    {
        path:"/auth",
        route:AuthRoutes
    },
    {
        path:"/division",
        route:divisionRoutes
    },
    {
        path:"/tour",
        route:TourRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
} );