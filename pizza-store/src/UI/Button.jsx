import { Link } from "react-router-dom"

function Button({children,disabled,to, type}) {
    const base =" text-sm bg-yellow-400 uppercase font-semibold text-stone-800 tracking-wide rounded-full hover:bg-yellow-300 trasnition-colors focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
    
    const styles = {
        primary: base + 'px-4 py-3 sm:px-6 sm:py-4',
        small: base + 'py-2 md:px-5 px-4 md:py-2.5 text-xs',
        secondary: 'text-sm border-2 border-stone-400 uppercase font-semibold text-stone-800 tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 trasnition-colors focus:outline-none focus:text-stone-800 focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:py-3.5'
    
    };
    
    if(to) {
        return <Link className={styles[type]} to={to}>{children}</Link>
    }


    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
