import React, { useState } from 'react';
import { Container, VStack, Input, Button, Text, Box, HStack, Select, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaPlus, FaRandom } from "react-icons/fa";

const Index = () => {
  const [names, setNames] = useState([{ name: '', phone: '' }]);
  const [pairs, setPairs] = useState([]);
  const [category, setCategory] = useState('default');

  const wordCategories = {
    default: ["shoes", "salary", "book", "coffee", "apple"],
    animals: ["cat", "dog", "elephant", "tiger", "lion"],
    colors: ["red", "blue", "green", "yellow", "purple"]
  };

  const handleInputChange = (index, event) => {
    const values = [...names];
    values[index][event.target.name] = event.target.value;
    setNames(values);
  };

  const handleAddFields = () => {
    setNames([...names, { name: '', phone: '' }]);
  };

  const handleGeneratePairs = () => {
    const selectedWords = wordCategories[category];
    if (names.length > selectedWords.length) {
      alert("Not enough unique words for the number of participants.");
      return;
    }
    const shuffledNames = [...names].sort(() => 0.5 - Math.random());
    const shuffledWords = [...selectedWords].sort(() => 0.5 - Math.random()).slice(0, names.length);
    const generatedPairs = shuffledNames.map((person, index) => ({
      name: person.name,
      phone: person.phone,
      pair: shuffledNames[(index + 1) % shuffledNames.length].name,
      word: shuffledWords[index]
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
        <Select placeholder="Select category" onChange={(e) => setCategory(e.target.value)}>
          <option value="default">Default</option>
          <option value="animals">Animals</option>
          <option value="colors">Colors</option>
        </Select>
        <Button leftIcon={<FaRandom />} onClick={handleGeneratePairs}>Generate Pairs</Button>
        {pairs.length > 0 && (
          <Box mt={4} width="100%">
            <Text fontSize="xl">Generated Pairs:</Text>
            {pairs.map((pair, index) => (
              <Box key={index} p={2} borderWidth="1px" borderRadius="md" mt={2}>
                <Text><strong>{pair.name}</strong> ({pair.phone}) should make <strong>{pair.pair}</strong> say the word <strong>{pair.word}</strong>.</Text>
              </Box>
            ))}
            <Table variant="simple" mt={4}>
              <Thead>
                <Tr>
                  <Th>Phone Number</Th>
                  <Th>Message</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pairs.map((pair, index) => (
                  <Tr key={index}>
                    <Td>{pair.phone}</Td>
                    <Td>Hi {pair.name} - you are welcome to play this game, you need to make {pair.pair} say the word {pair.word}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;