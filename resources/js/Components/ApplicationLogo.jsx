import logoWhite from "@/assets/images/logoWhite.png"
import logo from "@/assets/images/logo.png"
export default function ApplicationLogo({white = false}) {
    return (
        <>
            {white ? (
                <img className="w-smd-96" src={logoWhite} alt="Logo San Martin Es Tu Destino Blanco"/>
            ):(
                <img className="w-smd-96" src={logo} alt="Logo San Martin Es Tu Destino Blanco"/>
            )}</>
    );
}
