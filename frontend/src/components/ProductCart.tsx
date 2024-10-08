import { useCart } from "../context/Cart/CartContext";

interface Props {
    _id: string;
    title: string;
    price: string;
    image: string;
}

export const ProductCart = ({ _id, title, price, image }: Props) => {
    const { addItemsToCart } = useCart()
    return (
        <div className='grid grid-cols-1 gap-2 shadow-lg p-4 rounded'>
            <img src={image} alt="Description of the image" className='w-52 h-52 bg-center' />
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <span className='text-lg font-semibold'>Price: {price}DH</span>
            <button className='rounded-full bg-blue-500 text-white text-lg font-semibold py-2'
                onClick={() => addItemsToCart(_id)}>BUY</button>
        </div>
    )
}
