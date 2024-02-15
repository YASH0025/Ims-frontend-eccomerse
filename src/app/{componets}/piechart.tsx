// PieChart.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface PieChartProps {
  categoryData: any[];
  products: any[];
  width?: string;
  height?: string;
}

const PieChart: React.FC<PieChartProps> = ({
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
          type: "pie",
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
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 205, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                ],
              },
            ],
          },
        });
      }
    }
  }, [categoryData, products, width, height]);

  return (
    <div style={{ width, height }}>
      <canvas
        id="pieChart"
        width="400"
        height="400"
        ref={chartCanvasRef}
      ></canvas>
    </div>
  );
};

export default PieChart;
