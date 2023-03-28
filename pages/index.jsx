import {
  ActionIcon,
  Select,
  Text,
  Notification,
  Badge,
  Space,
  ColorSwatch,
  Group,
  useMantineTheme,
  Card,
  Menu,
  Popover,
  Button,
  Modal,
  Input,
  NumberInput,
  TextInput,
  MultiSelect,
  CheckIcon,
  rem,
  Progress,
} from "@mantine/core";
import ReactECharts from "echarts-for-react";
import {
  IconChevronDown,
  IconReceipt,
  IconHome,
  IconEgg,
  IconShoppingCart,
  IconBus,
  IconConfetti,
  IconBrandTinder,
  IconBrandNetflix,
  IconJumpRope,
  IconSwimming,
  IconCoin,
  IconBusinessplan,
  IconPlus,
  IconMinus,
  IconUser,
  IconDotsVertical,
} from "@tabler/icons";
import { useState, useEffect, useRef } from "react";
import moment from "moment/moment";

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export default function Home() {
  const chartRef = useRef(null);

  const mock_data = {
    labels: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"],
    datasets: [
      {
        label: "Expenditure",
        data: [230, 100, 400, 320, 560, 90, 300],
        backgroundColor: "teal",
      },
    ],
  };

  // useEffect(() => {
  //   let ctx = chartRef.current.getContext("2d");
  //   new Chart(ctx, {
  //     type: "bar",
  //     data: mock_data,
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //       scales: [
  //         {
  //           grid:
  //         }
  //       ],
  //     },
  //   });
  // }, []);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [openedNewTarget, setNewTargetState] = useState(false);
  const [openedNewCashIn, setNewCashInState] = useState(false);
  const [openedNewCashOut, setNewCashOutState] = useState(false);

  const [targetName, setTargetName] = useState("");
  const [targetAmount, setTargetAmount] = useState(null);
  const [targetReminder, setTargetReminder] = useState("DAILY");
  const [targetColor, setTargetColor] = useState(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const theme = useMantineTheme();

  const [chartOptions, setChartOptions] = useState({});
  const [chartOptionsDonut, setChartOptionsDonut] = useState({});

  const [current, setCurrent] = useState(
    `${month[new Date().getMonth()]} ${new Date().getFullYear()}`
  );

  const data = month.map((m) => `${m} ${new Date().getFullYear()}`);
  const tags = [
    "food",
    "shopping",
    "rent",
    "travel",
    "enjoyment",
    "date",
    "netflix",
    "gym",
    "swimming",
  ];

  const [openCategorization, setOpenCategorization] = useState(false);

  const mock_transactions = [
    {
      id: 1,
      amount: 120,
      tags: ["food", "lunch"],
      source: null,
      type: "CASH_OUT",
      createdAt: "1679809484104",
    },
    {
      id: 2,
      amount: 25000,
      tags: null,
      source: null,
      type: "CASH_IN",
      createdAt: "1679809484104",
    },
    {
      id: 3,
      amount: 1030,
      tags: ["shopping"],
      source: null,
      type: "CASH_OUT",
      createdAt: "1679809484104",
    },
    {
      id: 4,
      amount: 240,
      tags: ["tailor"],
      source: null,
      type: "CASH_OUT",
      createdAt: "1679809484104",
    },
    {
      id: 5,
      amount: 1000,
      tags: ["swimming"],
      source: null,
      type: "CASH_OUT",
      createdAt: "1679809484104",
    },
  ];

  const mock_savings = [
    {
      id: 1,
      name: "Birthday 2023",
      target: 30000,
      amount: 10000,
      status: "",
      color: "teal",
    },
    {
      id: 2,
      name: "Microwave",
      target: 9000,
      amount: 1200,
      status: "",
      color: "blue",
    },
  ];

  useEffect(() => {
    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
          offset: 12,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Spend",
          type: "bar",
          barWidth: 10,
          data: [10, 52, 200, 334, 390, 330, 220].map((item) => {
            return {
              value: item,
              itemStyle: {
                color: "teal",
                barBorderRadius: item > 0 ? [100, 100, 0, 0] : [0, 0, 100, 100],
              },
            };
          }),
        },
      ],
    };

    setChartOptions(options);
  }, []);

  const handleCategorize = () => {
    const optionsDonut = {
      dataset: {
        source: [
          ["score", "amount", "product"],
          [89.3, 58212, "Matcha Latte"],
          [57.1, 78254, "Milk Tea"],
          [74.4, 41032, "Cheese Cocoa"],
          [50.1, 12755, "Cheese Brownie"],
          [89.7, 20145, "Matcha Cocoa"],
          [68.1, 79146, "Tea"],
          [19.6, 91852, "Orange Juice"],
          [10.6, 101852, "Lemon Juice"],
          [32.7, 20112, "Walnut Brownie"],
        ],
      },
      grid: { containLabel: true },
      xAxis: { name: "amount" },
      yAxis: { type: "category" },
      visualMap: {
        orient: "horizontal",
        left: "center",
        min: 10,
        max: 100,
        text: ["High Score", "Low Score"],
        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ["#65B581", "#FFCE34", "#FD665F"],
        },
      },
      series: [
        {
          type: "bar",
          encode: {
            // Map the "amount" column to X axis.
            x: "amount",
            // Map the "product" column to Y axis
            y: "product",
          },
        },
      ],
    };

    setChartOptionsDonut(optionsDonut);

    setOpenCategorization(true);
  };

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      component="button"
      key={color}
      onClick={() => setTargetColor(theme.colors[color][6])}
      color={theme.colors[color][6]}
    >
      {targetColor == theme.colors[color][6] && <CheckIcon width={rem(10)} />}
    </ColorSwatch>
  ));

  return (
    <div className="relative h-[100vh]">
      <div className="p-6 relative max-h-[calc(100vh-85px)] overflow-y-auto">
        <Select
          placeholder="Pick one"
          rightSection={<IconChevronDown size="1rem" />}
          rightSectionWidth={30}
          w={"60%"}
          value={current}
          className="absolute top-12 left-[50%] translate-x-[-50%]"
          styles={{
            rightSection: { pointerEvents: "none" },
            outline: "none",
          }}
          onChange={setCurrent}
          data={data}
        />

        <div className="flex justify-between mt-[100px]">
          {/* spend */}
          <div>
            <Text c="dimmed" fz="sm">
              Spend
            </Text>
            <Text
              c="black"
              fw={700}
              style={{ fontSize: "1.7rem" }}
              className="tracking-tight"
            >
              {(12000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KES
            </Text>
          </div>

          {/* daily avg */}
          <div>
            <Text c="dimmed" fz="sm">
              Daily Avg.
            </Text>
            <Text
              c="black"
              fw={700}
              style={{ fontSize: "1.7rem" }}
              className="tracking-tight"
            >
              {(120).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KES
            </Text>
          </div>
        </div>

        {/* Chart area */}
        <div className="min-h-[300px]">
          <ReactECharts option={chartOptions} />
          <Space h={30} />
          <Button
            fullWidth
            variant="subtle"
            color="teal"
            onClick={handleCategorize}
          >
            Show by Tags
          </Button>
          <Modal
            size="calc(100vw - 3rem)"
            opened={openCategorization}
            onClose={() => setNewCashInState(false)}
            centered
            title={
              <h1 className="text-[1.3rem] pl-0 tracking-tight p-2 font-bold w-full text-center">
                Expenditure by tags
              </h1>
            }
          >
            <ReactECharts option={chartOptionsDonut} />
          </Modal>
        </div>

        {/* Savings */}
        <div>
          <h1 className="text-[1.3rem] pl-0 tracking-tight p-2 font-bold ">
            Savings
          </h1>
          <br />
          <div className="space-x-3 flex overflow-x-auto w-full h-[150px]">
            {mock_savings.map((saving) => (
              <Saving key={saving.id} data={saving} />
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div>
          <Space h={10} />
          <h1 className="text-[1.3rem] pl-0 tracking-tight p-2 font-bold ">
            Recents
          </h1>
          <br />
          <div className="space-y-3">
            {mock_transactions.map((transaction) => (
              <Transaction key={transaction.id} data={transaction} />
            ))}
          </div>
        </div>
      </div>

      {/* New target modal */}
      <Modal
        opened={openedNewTarget}
        onClose={() => setNewTargetState(false)}
        centered
        title={
          <h1 className="text-[1.3rem] pl-0 tracking-tight p-2 font-bold w-full text-center">
            New Target
          </h1>
        }
      >
        <Space h={20} />
        <div className="space-y-4">
          <TextInput
            variant="filled"
            label="What are you saving for"
            placeholder="ex. Microwave"
          />
          <NumberInput
            variant="filled"
            label="Target amount"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            hideControls
            placeholder="ex. 10,000"
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `KSH ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "KSH "
            }
          />
          <Select
            variant="filled"
            label="Reminder"
            placeholder=""
            onChange={setTargetReminder}
            value={targetReminder}
            data={["DAILY", "WEEKLY", "MONTHLY"]}
          />
          <Space h={10} />
          <Group position="center" spacing="xs">
            {swatches}
          </Group>

          <Space h={20} />
          <Button color="teal" uppercase fullWidth>
            create target
          </Button>
        </div>
      </Modal>

      {/* New Cash In Modal */}
      <Modal
        opened={openedNewCashIn}
        onClose={() => setNewCashInState(false)}
        centered
        title={
          <h1 className="text-[1.3rem] pl-0 tracking-tight p-2 font-bold w-full text-center">
            New Cash In
          </h1>
        }
      >
        <Space h={10} />
        <div className="space-y-4">
          <NumberInput
            variant="filled"
            label="Amount"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            hideControls
            placeholder="ex. 10,000"
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `KSH ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "KSH "
            }
          />
          <Space h={10} />
          <Button color="teal" uppercase fullWidth>
            cash in
          </Button>
        </div>
      </Modal>

      {/* New Cash Out Modal */}
      <Modal
        opened={openedNewCashOut}
        onClose={() => setNewCashOutState(false)}
        centered
        title={
          <h1 className="text-[1.3rem] pl-0 tracking-tight p-2 font-bold w-full text-center">
            New Cash Out
          </h1>
        }
      >
        <Space h={20} />
        <div className="space-y-4">
          <NumberInput
            variant="filled"
            label="Amount"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            hideControls
            placeholder="ex. 10,000"
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `KSH ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "KSH "
            }
          />
          <MultiSelect
            label="Expenditure tags"
            data={tags}
            placeholder="ex. Shopping"
            searchable
            dropdownPosition="bottom"
            onChange={setSelectedTags}
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setSelectedTags((current) => [...current, item]);
              return item;
            }}
          />
          <Space h={20} />
          <Button color="teal" uppercase fullWidth>
            cash out
          </Button>
        </div>
      </Modal>

      {/* Bottom navigation */}
      <div className="absolute bottom-0 w-full bg-white flex px-12 py-4 justify-evenly items-baseline shadow-md">
        <ActionIcon color="teal" onClick={() => setNewTargetState(true)}>
          <IconBusinessplan size="2rem" />
        </ActionIcon>

        <ActionIcon
          color="teal"
          variant="filled"
          w={48}
          h={48}
          onClick={() => setNewCashInState(true)}
        >
          <IconPlus size="2rem" />
        </ActionIcon>

        <ActionIcon
          color="teal"
          variant="filled"
          w={48}
          h={48}
          onClick={() => setNewCashOutState(true)}
        >
          <IconMinus size="2rem" />
        </ActionIcon>

        <ActionIcon color="teal">
          <IconUser size="2rem" />
        </ActionIcon>
      </div>
    </div>
  );
}

const Transaction = ({ data }) => {
  return (
    <Notification
      withCloseButton={false}
      color={data?.type == "CASH_IN" ? "green" : "red"}
    >
      <div className="flex justify-between min-h-[60px]">
        <div className="flex space-x-4">
          <ActionIcon
            color={data?.type == "CASH_IN" ? "green" : "red"}
            variant="light"
            w={56}
            h={56}
            p={0}
          >
            {data.tags && data.tags[0] == "rent" ? (
              <IconHome />
            ) : data.tags && data.tags[0] == "food" ? (
              <IconEgg />
            ) : data.tags && data.tags[0] == "shopping" ? (
              <IconShoppingCart />
            ) : data.tags && data.tags[0] == "travel" ? (
              <IconBus />
            ) : data.tags && data.tags[0] == "enjoyment" ? (
              <IconConfetti />
            ) : data.tags && data.tags[0] == "date" ? (
              <IconBrandTinder />
            ) : data.tags && data.tags[0] == "netflix" ? (
              <IconBrandNetflix />
            ) : data.tags && data.tags[0] == "gym" ? (
              <IconJumpRope />
            ) : data.tags && data.tags[0] == "swimming" ? (
              <IconSwimming />
            ) : data?.type == "CASH_IN" ? (
              <IconCoin />
            ) : (
              <IconReceipt />
            )}
          </ActionIcon>

          <div>
            <Text fw={700} fz="md">
              {data?.tags ? toTitleCase(data?.tags[0]) : "CASH IN"}
            </Text>
            <div className="space-x-1 mt-2">
              {data?.tags &&
                data.tags.map((tag, i) => (
                  <Badge
                    radius="xs"
                    variant="light"
                    size="sm"
                    color="teal"
                    key={i}
                  >
                    {toTitleCase(tag)}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        <div>
          <Text c={data?.type == "CASH_IN" ? "green" : "red"} fz="lg" fw={700}>
            {data?.type == "CASH_IN"
              ? `KSH ${(data?.amount)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : ` -KSH ${(data?.amount)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </Text>
          <Text c="dimmed" fz="sm" style={{ textAlign: "right" }}>
            {moment(new Date(parseInt(data?.createdAt))).format("DD ddd")}
          </Text>
        </div>
      </div>
    </Notification>
  );
};

const Saving = ({ data }) => {
  const [topUpState, setTopUpState] = useState(false);
  const [editState, setEditState] = useState(false);

  return (
    <div style={{ minWidth: 250, position: "relative" }}>
      {/* Top Up Modal */}
      <Modal
        opened={topUpState}
        onClose={() => setTopUpState(false)}
        centered
        title={
          <h1 className="text-[1.3rem] pl-0 tracking-tight p-2 font-bold w-full text-center">
            Top Up
          </h1>
        }
      >
        <Space h={10} />
        <div className="space-y-4">
          <NumberInput
            variant="filled"
            label="Amount"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            hideControls
            placeholder="ex. 10,000"
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `KSH ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "KSH "
            }
          />
          <Space h={10} />
          <Button color="teal" uppercase fullWidth>
            Top Up
          </Button>
        </div>
      </Modal>

      <Card shadow="sm" padding="sm" radius="md" withBorder>
        <span className="flex w-full justify-between">
          <Text c={data?.color} fw={700}>
            {data?.name}
          </Text>
        </span>
        <span className="flex items-baseline space-x-2 mt-2">
          <Text c="dimmed" fz="sm">
            KSH{" "}
            {(data?.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </Text>
          <Text c="dimmed" fz="sm">
            /
          </Text>
          <Text c={data?.color} fz="sm">
            KSH{" "}
            {(data?.target).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </Text>
        </span>
        <br />
        <Progress
          radius="xl"
          size={16}
          sections={[
            {
              value: ((data.amount / data.target) * 100).toFixed(0),
              color: data?.color,
              label: `${((data.amount / data.target) * 100).toFixed(0)}%`,
              tooltip: null,
            },
          ]}
        />
      </Card>
      <Menu
        shadow="md"
        position="left"
        width={100}
        style={{ zIndex: 99, position: "absolute", top: 12, right: 12 }}
      >
        <Menu.Target>
          <ActionIcon variant="subtle" color={data?.color}>
            <IconDotsVertical size="0.9rem" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Options</Menu.Label>
          <Menu.Item onClick={() => setTopUpState(true)}>Top up</Menu.Item>
          <Menu.Item>Expend</Menu.Item>
          <Menu.Item>Delete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
