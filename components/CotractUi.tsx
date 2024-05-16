import { useMemo, useState } from "react";
import Head from "next/head";
import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import { IWeb3Context, useWeb3Context } from "../context/Web3ContextProvider";
import { FaEthereum } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { MdCancel } from "react-icons/md";

const BSCTChainID = 97;

export default function ContarctUi({setShow}:any) {
    const {
        connectWallet,
        disconnect,
        state: { isAuthenticated, address, currentChain, provider },
    } = useWeb3Context() as IWeb3Context;

    return (
        <div className=" xs:w-72 sm:w-[600px] relative">
            <p className='my-5 text-3xl font-bold text-[var(--blue-color)] text-center'> pay in Crypto</p>
            <button type='button' onClick={()=>setShow(false)} className=' text-[#f00] absolute -top-10 -right-3 text-4xl z-10'><MdCancel/></button>
            <HStack
                width="full"
                as="header"
                height="80px"
                px={4}
                alignItems="center"
                bg="gray.100"
            >
                <HStack as="nav" width="full" justifyContent="space-between">
                    <HStack>
                        {!isAuthenticated ? (
                            <Button
                                onClick={connectWallet}
                                variant="solid"
                                bg="blue.400"
                                colorScheme="blue"
                                gap={2}
                                color="white"
                            >
                                <Icon as={FaEthereum} />
                                Connect wallet
                            </Button>
                        ) : (
                            <Button
                                onClick={disconnect}
                                variant="solid"
                                bg="red.400"
                                colorScheme="red"
                                color="white"
                                gap={2}
                            >
                                <Icon as={BiLogOut} />
                                Disconnect
                            </Button>
                        )}
                    </HStack>
                </HStack>
            </HStack>
        </div>
    );
}