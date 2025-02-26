import { create } from "zustand";
import axios from "axios";

interface Image {
    id: string;
    imageUrl: string;
}

export interface Product {
    id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategoryId: string;
    productStatus: boolean;
    images: Image[];
}

interface ProductResponse {
    items: Product[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

interface CatalogState {
    data: ProductResponse | null;
    loading: boolean;
    error: string | null;
    fetchData: (id: string) => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set) => ({
    data: null,
    loading: false,
    error: null,

    fetchData: async (categoryId: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get<ProductResponse>(
                `https://w0zw4ld-001-site1.ktempurl.com/api/products/getByCategory?categoryId=${categoryId}`
            );
            set({ data: response.data, loading: false });
        } catch (error) {
            set({ error: "Ошибка загрузки данных: " + error, loading: false });
        }
    },
}));
