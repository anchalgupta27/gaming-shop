import { useQuery } from "@tanstack/react-query";
import { ProductUsecase } from "../../features/usecase/ProductUsecase";
import { useParams } from "react-router"; // Use react-router-dom for hooks
import { useCallback, useEffect, useState } from "react";
import { AuthRepository } from "../../features/repository/AuthRepository";
import { CartRepository } from "../../features/repository/CartRepository";

type ProductParam = { id: string };

export function useProduct() {
    const { id } = useParams<ProductParam>();
    const [size, setSize] = useState<string>();
    const [color, setColor] = useState<string>();

    if (!id) {
        throw new Error("Product ID is missing from the URL");
    }

    const handleSize = useCallback((size: string) => {
        console.log(size)
        setSize(size);
    }, [size])

    const handleColor = useCallback((color: string) => {
        setColor(color);
    }, [color])

    const { data, error, isLoading } = useQuery({
        queryKey: ['ProductUsecase', 'fetchProductById', id], // include `id` to make the key dynamic
        queryFn: () => ProductUsecase.fetchProductById(id),
        enabled: !!id // ensures query runs only if `id` is present
    });

    console.log(data)


    const handleAddToCart = useCallback(async (name: string, price: number) => {
        const storedUser = AuthRepository.currentUser();

        console.log(storedUser?.userId )
        console.log(size)
        console.log(color)
        console.log(name)
        if (!storedUser?.userId || !size || !color || !name) {
            window.alert("Please check size and color");
            return;
        }

        const userId = storedUser?.userId!
        console.log({
            userId,
            productId: id,
            size: size,
            color: color,
            quantity: 1,
            name,
            price
        })

        await CartRepository.addProductToCart({
            userId,
            productId: id,
            size: size,
            color: color,
            quantity: 1,
            name,
            price
        })
    }, [size, color])

    useEffect(() => {
        console.log("Fetched product", data);
    }, [data]); // log only when data changes

    return {
        product: data ?? {},
        error,
        isLoading,
        handleColor,
        handleSize,
        size: size,
        color: color,
       handleAddToCart
    };
}
