// CategoryChart.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface CategoryChartProps {
  categoryData: any[];
  products: any[];
  width?: string;
  height?: string;
}

const CategoryChart: React.FC<CategoryChartProps> = ({
  categoryData,
  products,
  width = "100%",
  height = "400px",
}) => {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartCanvasRef.current) {
      const canvas = chartCanvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        Chart.getChart(canvas)?.destroy();

        // Define materialistic colors
        const materialColors = [
          "rgba(244, 67, 54, 0.6)",
          "rgba(63, 81, 181, 0.6)",
          "rgba(255, 152, 0, 0.6)",
          "rgba(0, 150, 136, 0.6)",
          "rgba(156, 39, 176, 0.6)",
          "rgba(255, 193, 7, 0.6)",
          "rgba(33, 150, 243, 0.6)",
          "rgba(76, 175, 80, 0.6)",
        ];

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: categoryData.map((category) => category.name),
            datasets: [
              {
                label: "Number of Products",
                data: categoryData.map((category) => {
                  console.log(category);

                  const productsInCategory = products.filter(
                    (product: { productId: any }) =>
                      product.productId &&
                      product.productId.category === category._id
                  );

                  return productsInCategory.reduce(
                    (total: any, product: { quantity: any }) =>
                      total + product.quantity,
                    0
                  );
                }),
                backgroundColor: materialColors.slice(0, categoryData.length), // Use materialistic colors
                borderColor: "rgba(0,0,0,0.2)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Products",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Category",
                },
              },
            },
          },
        });
      }
    }
  }, [categoryData, products, width, height]);

  return (
    <div style={{ width, height }}>
      <canvas
        id="categoryChart"
        width="400"
        height="400"
        ref={chartCanvasRef}
      ></canvas>
    </div>
  );
};

export default CategoryChart;
