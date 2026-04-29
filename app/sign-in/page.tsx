// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const signInSchema = z.object({
//   email: z.email(),
//   password: z.string()
// });

// type LogInSchema = z.infer<typeof signInSchema>



// const signIn = () => {

//   const {handleSubmit, formState: {errors, isSubmitting}} = useForm<LogInSchema>({resolver: zodResolver(signInSchema)})

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-md border border-gray-300">
//       <div className="text-center">
//         {" "}
//         <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
//         <p className="text-gray-400 mb-4">
//           Start sending money safely in minutes
//         </p>
//       </div>

//       <form action="submit" className="my-4" 
//       // onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="my-4">
//           <label htmlFor="" className="text-sm font-semibold mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             // {...register("email")}
//             placeholder="john@example.com"
//             className="w-full text-black border border-gray-300 p-3 rounded-xl focus:outline focus:outline-blue-400"
//           />
//           {/* {errors.email && (
//             <div className="text-red-500">{errors.email.message}</div>
//           )} */}
//         </div>

//         <div className="my-4">
//           <label htmlFor="" className="text-sm font-semibold mb-2">
//             Password
//           </label>
//           <input
//             type="text"
//             // {...register("password")}
//             placeholder="********"
//             className="w-full text-black border border-gray-300 p-3 rounded-xl focus:outline focus:outline-blue-400"
//           />
//           {errors.password && (
//             <div className="text-red-500">{errors.password.message}</div>
//           )}
//         </div>

//         <button
//           disabled={isSubmitting}
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 cursor-pointer"
//         >
//           {isSubmitting ? "Signing in..." : "Sign in"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default signIn;
