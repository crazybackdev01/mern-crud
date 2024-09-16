// import { useEffect } from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product.store.js";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { products, getProducts } = useProductStore();

  //products variable is an Array of products available in Database
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Agar getProducts() call nahi kiya na toh page ko refresh karne se saare products udh jaayenge UI se par database me rahenge kuki products array ko apan ne initialize [] se kiya hai ==> state: { products : [] }
  // Varna agar page ko refresh naa kare toh Kaam toh only products variable global store se access karke or phir unko page par render karne se bhi hojayega par refresh karne se data persist nahi rahegaa.....
  // Jab bhi page refresh maarenge toh getProducts() call karne se woh products array me existing products in database fetch karke set kardega

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
