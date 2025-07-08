import {
  Chart,
  type ChartConfiguration,
  Tooltip,
  type TooltipPositionerFunction,
  type ChartType,
  type ActiveElement,
  type Point,
} from "chart.js/auto";
import * as React from "react";
declare module "chart.js" {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}
import { cn } from "@/lib/utils";

interface ChartBubbleProps extends React.ComponentProps<"div"> {
  labels?: ChartConfiguration["data"]["labels"];
  datasets?: ChartConfiguration["data"]["datasets"];
}

export function ChartBubble({
  labels,
  datasets,
  className,
  ...props
}: ChartBubbleProps) {
  const chartRef = React.useRef<HTMLCanvasElement>(null);
  const chartInstance = React.useRef<Chart>(null);
  const [isCanvasReady, setIsCanvasReady] = React.useState(false);

  // 监听 Canvas 元素挂载状态
  React.useEffect(() => {
    setIsCanvasReady(!!chartRef.current);
  }, [chartRef.current]);

  Tooltip.positioners.myCustomPositioner = function (
    _elements: readonly ActiveElement[],
    eventPosition: Point
  ) {
    return {
      x: eventPosition.x,
      y: eventPosition.y,
    };
  };

  // 使用 useMemo 创建渐变色，确保 Canvas 已挂载
  const lineGradient = React.useMemo(() => {
    if (!isCanvasReady || !chartRef.current) return null;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return null;

    // 创建线性渐变（从顶部到底部）
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 99, 132, 0.8)"); // 起始颜色（不透明）
    gradient.addColorStop(1, "rgba(255, 99, 132, 0.1)"); // 结束颜色（接近透明）

    return gradient;
  }, [isCanvasReady]);

  // 为填充区域创建更透明的渐变
  const fillGradient = React.useMemo(() => {
    if (!isCanvasReady || !chartRef.current) return null;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return null;

    // 创建填充区域的渐变（更透明）
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 99, 132, 0.3)"); // 起始颜色（半透明）
    gradient.addColorStop(1, "rgba(255, 99, 132, 0.05)"); // 结束颜色（几乎透明）

    return gradient;
  }, [isCanvasReady]);

  // 使用 useMemo 创建图表配置，依赖于渐变的可用性
  const chartConfig = React.useMemo(() => {
    if (!lineGradient || !fillGradient) return null;

    return {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets?.map((item) => {
          return {
            ...item,
            backgroundColor: item.type === "bar" ? lineGradient : fillGradient,
          };
        }),
      },
      options: {
        interaction: {
          intersect: false,
          mode: "index",
        },
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            position: "myCustomPositioner",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    } as ChartConfiguration;
  }, [lineGradient, fillGradient]);

  // 管理图表生命周期
  React.useEffect(() => {
    if (!chartRef.current || !chartConfig) return;

    // 销毁旧图表
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // 创建新图表
    chartInstance.current = new Chart(chartRef.current, chartConfig);

    // 清理函数
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartConfig]);

  return (
    <div className={cn("h-80", className)} {...props}>
      <canvas ref={chartRef} />
    </div>
  );
}
