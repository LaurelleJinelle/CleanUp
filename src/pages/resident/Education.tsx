import React, { useState } from "react";
import { BookOpenIcon, SearchIcon, TagIcon, ThumbsUpIcon, ExternalLinkIcon } from "lucide-react";
const Education = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [{
    id: "all",
    name: "All Articles"
  }, {
    id: "recycling",
    name: "Recycling"
  }, {
    id: "composting",
    name: "Composting"
  }, {
    id: "reduction",
    name: "Waste Reduction"
  }, {
    id: "hazardous",
    name: "Hazardous Waste"
  }];
  const articles = [{
    id: 1,
    title: "How to Properly Sort Your Recyclables",
    category: "recycling",
    date: "October 5, 2023",
    excerpt: "Learn the correct way to sort different types of recyclable materials to ensure they can be properly processed.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }, {
    id: 2,
    title: "Reducing Food Waste at Home",
    category: "reduction",
    date: "September 28, 2023",
    excerpt: "Simple strategies to minimize food waste in your household, saving money and helping the environment.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }, {
    id: 3,
    title: "Composting 101: Getting Started",
    category: "composting",
    date: "September 15, 2023",
    excerpt: "A beginner's guide to starting your own compost pile or bin at home, even with limited space.",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1588167056547-c733701ecfdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }, {
    id: 4,
    title: "Safe Disposal of Hazardous Household Waste",
    category: "hazardous",
    date: "September 10, 2023",
    excerpt: "Guidelines for identifying and properly disposing of common household items that are considered hazardous waste.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }, {
    id: 5,
    title: "The Benefits of Recycling Electronics",
    category: "recycling",
    date: "August 22, 2023",
    excerpt: "Why it's important to recycle electronic devices and how to do it responsibly in your community.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }, {
    id: 6,
    title: "Creating a Zero-Waste Kitchen",
    category: "reduction",
    date: "August 15, 2023",
    excerpt: "Practical tips for reducing waste in your kitchen through smart shopping, storage, and cooking practices.",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }];
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = searchQuery === "" || article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const getCategoryColor = category => {
    switch (category) {
      case "recycling":
        return "bg-blue-100 text-blue-800";
      case "composting":
        return "bg-green-100 text-green-800";
      case "reduction":
        return "bg-yellow-100 text-yellow-800";
      case "hazardous":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Educational Resources
        </h2>
        <p className="text-gray-600">
          Learn about proper waste management and environmental practices.
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <BookOpenIcon className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-800">
                Articles & Guides
              </h3>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="pl-10 block w-full sm:w-64 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-6 py-4 overflow-x-auto">
            <div className="flex space-x-2">
              {categories.map(category => <button key={category.id} className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${activeCategory === category.id ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`} onClick={() => setActiveCategory(category.id)}>
                  {category.name}
                </button>)}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? filteredArticles.map(article => <div key={article.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                    {getCategoryName(article.category)}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500 flex items-center">
                    <BookOpenIcon className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </span>
                  <button className="text-blue-600 hover:text-blue-500 text-sm font-medium flex items-center">
                    Read article
                    <ExternalLinkIcon className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>) : <div className="col-span-full text-center py-12">
            <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No articles found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>}
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ThumbsUpIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">Get Involved</h3>
            <p className="text-blue-700 mt-1">
              Want to contribute to our educational resources or suggest topics?
              Contact us at education@ecowaste.example.com
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Education;