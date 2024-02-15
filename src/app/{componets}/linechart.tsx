// LineChart.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LineChartProps {
  categoryData: any[];
  products: any[];
  width?: string;
  height?: string;
}

const LineChart: React.FC<LineChartProps> = ({
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

        new Chart(ctx, {
          type: "line",
          data: {
            labels: categoryData.map((category) => category.name),
            datasets: [
              {
                label: "Number of Products",
                data: categoryData.map((category) => {
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
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
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
        id="lineChart"
        width="400"
        height="400"
        ref={chartCanvasRef}
      ></canvas>
    </div>
  );
};

export default LineChart;
