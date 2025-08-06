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

  // 为填充区域创建更透明的渐变
  const [lineGradient, fillGradient] = React.useMemo(() => {
    if (!isCanvasReady || !chartRef.current) return [null, null];

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return [null, null];

    const width = ctx.canvas.width;

    // 创建线性渐变（从顶部到底部）
    const gradient_fill = ctx.createLinearGradient(0, -width * 0.5, 0, width);
    gradient_fill.addColorStop(0.05, "rgba(190,242,100,0.8)");
    gradient_fill.addColorStop(0.95, "rgba(190,242,100,0.1)");

    return [null, gradient_fill];
  }, [isCanvasReady]);

  // 使用 useMemo 创建图表配置，依赖于渐变的可用性
  const chartConfig = React.useMemo(() => {
    if (!fillGradient) return null;

    return {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets?.map((item) => {
          return {
            ...item,
            backgroundColor: fillGradient,
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
          x: {
            padding: 0,
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            offset: false,
            border: {
              display: true, // y轴轴线
            },
            ticks: {
              display: true,
              count: 4,
            },
            // 隐藏Y轴标题
            title: {
              display: false,
            },
            // 保留网格线（默认显示）
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)", // 可选：设置网格线颜色
              drawOnChartArea: true,
            },
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
