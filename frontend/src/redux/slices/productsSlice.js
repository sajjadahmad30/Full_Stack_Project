 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk("products/fetchByFilters", async({
    collection, 
    size,
    color,
    gender, 
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
})=>{
    const query = new URLSearchParams();
    if(collection) query.append("collection", collection);
    if(size) query.append("size", size);
    if(color) query.append("color", color);
    if(gender) query.append("gender", gender);
    if(minPrice) query.append("minPrice", minPrice);
    if(maxPrice) query.append("maxPrice", maxPrice);
    if(sortBy) query.append("sortBy", sortBy);
    if(search) query.append("search", search);
    if(material) query.append("material", material);
    if(category) query.append("category", category);
    if(brand) query.append("brand", brand);
    if(limit) query.append("limit", limit);

    const respone = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`);
    return respone.data;
}
);



//async thunk to fetch a single product by id
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails", async(id)=>{
    
    const respone = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${id}`);
    return respone.data;
});



//async thunk to fetch similar products
export const updateProduct = createAsyncThunk("products/updateProduct", async({id, productData})=>{
    
    const respone = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${id}`, productData,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("userToken")},`
        },
    });
    return respone.data;
});


//Async Thunk to fetch similar products
export const fetctSimilarProducts = createAsyncThunk("products/fetchSimilarProducts",async({id})=>{
       const respone = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/similar${id}`);
      return respone.data;
});

const productSlice = createSlice({
    name: "products",
    initialState:{
        products:[],
        selectedProduct : null,
        similarProducts: [],
        loading: false,
        error: null,
        filters:{
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        },
    },
    reducers:{
        setFilters: (state, action)=>{
            state.filters= {...state.filters, ...action.payload};
        },
        clearFilters:(state)=>{
            state.filters={
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
            },
        },
    },
    extraReducers: (builder)=>{
        builder
        // handle fetching products with filter
        .addCase(fetchProductsByFilters.pending, (state)=>{
            state.loading = true;
            state.error= null;
        })
        .addCase(fetchProductsByFilters.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductsByFilters.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // handle fetching single product
        .addCase(fetchProductDetails.pending, (state)=>{
            state.loading = true;
            state.error= null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action)=>{
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
         // handle updating product
        .addCase(updateProduct.pending, (state)=>{
            state.loading = true;
            state.error= null;
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.loading = false;
           const updatedProduct = action.payload;
            const index = state.products.findIndex((product)=> product._id === updateProduct._id);
            if(index !== -1){
                state.products[index] = updatedProduct;
            }
        })
        .addCase(updateProduct.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })  
         // handle update similar product
        .addCase(fetctSimilarProducts.pending, (state)=>{
            state.loading = true;
            state.error= null;
        })
        .addCase(fetctSimilarProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetctSimilarProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })  

    }
})



export const {setFilters, clearFilters} = productSlice.actions;
export default productSlice.reducer;