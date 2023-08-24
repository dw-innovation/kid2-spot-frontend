"use client";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BBox from "./BBox";
import NamedArea from "./NamedArea";
import Polygon from "./Polygon";

const AreaSelector = () => (
  <div className="flex-1 w-full">
    <Tabs defaultValue="namedArea">
      <TabsList className="w-full">
        <TabsTrigger value="namedArea">Named Area</TabsTrigger>
        <TabsTrigger value="bbox">Map View</TabsTrigger>
        <TabsTrigger value="polygon">Custom Polygon</TabsTrigger>
      </TabsList>
      <TabsContent value="namedArea">
        <NamedArea />
      </TabsContent>
      <TabsContent value="bbox">
        <BBox />
      </TabsContent>
      <TabsContent value="polygon">
        <Polygon />
      </TabsContent>
    </Tabs>
  </div>
);

export default AreaSelector;
