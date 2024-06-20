import React, { useState } from 'react';
import { Container, VStack, Input, Button, Text, Box, HStack } from "@chakra-ui/react";
import { FaPlus, FaRandom } from "react-icons/fa";

const Index = () => {
  const [names, setNames] = useState([{ name: '', phone: '' }]);
  const [pairs, setPairs] = useState([]);

  const handleInputChange = (index, event) => {
    const values = [...names];
    values[index][event.target.name] = event.target.value;
    setNames(values);
  };

  const handleAddFields = () => {
    setNames([...names, { name: '', phone: '' }]);
  };

  const handleGeneratePairs = () => {
    const randomWords = ["shoes", "salary", "book", "coffee", "apple"];
    const shuffledNames = [...names].sort(() => 0.5 - Math.random());
    const generatedPairs = shuffledNames.map((person, index) => ({
      name: person.name,
      phone: person.phone,
      pair: shuffledNames[(index + 1) % shuffledNames.length].name,
      word: randomWords[Math.floor(Math.random() * randomWords.length)]
    }));
    setPairs(generatedPairs);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Social Game App</Text>
        {names.map((name, index) => (
          <HStack key={index} spacing={2} width="100%">
            <Input
              placeholder="Name"
              name="name"
              value={name.name}
              onChange={event => handleInputChange(index, event)}
            />
            <Input
              placeholder="Phone Number"
              name="phone"
              value={name.phone}
              onChange={event => handleInputChange(index, event)}
            />
          </HStack>
        ))}
        <Button leftIcon={<FaPlus />} onClick={handleAddFields}>Add More</Button>
        <Button leftIcon={<FaRandom />} onClick={handleGeneratePairs}>Generate Pairs</Button>
        {pairs.length > 0 && (
          <Box mt={4} width="100%">
            <Text fontSize="xl">Generated Pairs:</Text>
            {pairs.map((pair, index) => (
              <Box key={index} p={2} borderWidth="1px" borderRadius="md" mt={2}>
                <Text><strong>{pair.name}</strong> ({pair.phone}) should make <strong>{pair.pair}</strong> say the word <strong>{pair.word}</strong>.</Text>
              </Box>
            ))}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;