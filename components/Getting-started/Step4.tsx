import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Step4.tsx

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phonenNumber: z.string().min(10),
  email: z.email(),
  password: z.string().min(8),
});

type userSchema = z.infer<typeof schema>;

export const Step4 = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userSchema>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<userSchema> = async (data: userSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    const result = schema.safeParse(data);

    if (result.success) {
      router.push("/dashboard");
    } else {
      console.log("Fill the form");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-md border border-gray-300">
      <div className="text-center">
        {" "}
        <h2 className="text-2xl font-semibold mb-4">Create Your Account</h2>
        <p className="text-gray-400 mb-4">
          Start sending money safely in minutes
        </p>
      </div>

      <form action="submit" className="my-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <label htmlFor="" className="text-sm font-semibold mb-4">
            First Name
          </label>
          <input
            type="text"
            placeholder="John"
            {...register("firstName")}
            className="w-full text-black border border-gray-300 p-3 rounded-xl focus:outline focus:outline-blue-400"
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
        </div>

        <div className="my-4">
          <label htmlFor="" className="text-sm font-semibold mb-4">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Doe"
            {...register("lastName", { required: "Last Name is required" })}
            className="w-full text-black border border-gray-300 p-3 rounded-xl focus:outline focus:outline-blue-400"
          />
          {errors.lastName && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>

        <div className="my-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="w-full text-black border border-gray-300 p-3 rounded-xl focus:outline focus:outline-blue-400"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="my-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phonenNumber")}
            placeholder="+x xxx xxx xxxx"
            className="w-full text-black border border-gray-300 p-3 rounded-xl focus:outline focus:outline-blue-400"
          />
          {errors.phonenNumber && (
            <div className="text-red-500">{errors.phonenNumber.message}</div>
          )}
        </div>

        <div className="my-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="********"
            className="w-full text-black border border-gray-300 p-3 rounded-xl focus:outline focus:outline-blue-400"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 cursor-pointer"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};
