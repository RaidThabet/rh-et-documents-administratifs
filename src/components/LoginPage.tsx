import {Card, CardHeader, CardBody} from "@heroui/card";
import {MdEmail} from "react-icons/md";
import {Input} from "@heroui/input";
import {RiLockPasswordFill} from "react-icons/ri";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginSchema} from "../lib/schema/loginSchema.ts";
import {Avatar} from "@heroui/avatar";

function LoginPage() {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onTouched"
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })

    return (
        <div className={"bg-gradient-to-r from-indigo-500 to-blue-500 flex justify-center items-center h-full w-full"}>
            <Card className={"px-4 w-3/12"}>
                <CardHeader className={"flex flex-col justify-start items-center gap-2"}>
                    <Avatar size={"lg"} src={"public/images/logo_isimm.png"} />
                    <p className={"text-2xl font-bold"}>Authentification</p>
                    <p className={"text-md text-center font-semibold"}>
                        Bonjour! Veuillez saisir vos coordonnées pour vous connecter.
                    </p>
                </CardHeader>
                <CardBody>
                    <form onSubmit={onSubmit} className={"flex flex-col justify-center items-center gap-4 h-full"}>
                        <Input
                            startContent={<MdEmail size={20}/>}
                            type={"email"}
                            placeholder={"Entrez votre email"}
                            errorMessage={errors.email?.message as string}
                            isInvalid={!!errors.email?.message}
                            size={"md"}
                            {...register("email")}
                        />
                        <Input
                            startContent={<RiLockPasswordFill size={20}/>}
                            type={"password"}
                            placeholder={"Entrez votre mot de passe"}
                            errorMessage={errors.password?.message as string}
                            isInvalid={!!errors.password?.message}
                            size={"md"}
                            {...register("password")}
                            description={<a href={"/login"}>Mot de passe oublié?</a>}
                        />
                        <button disabled={!isValid} type={"submit"}
                                className={"mt-5 rounded-md bg-[#4879f4] disabled:opacity-50 text-white font-semibold py-2 px-4"}>
                            Se Connecter
                        </button>
                    </form>
                </CardBody>
            </Card>
        </div>

    );
}

export default LoginPage;