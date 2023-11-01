import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from "../context/GlobalState";

const ExpenseChart = () => {
	const { transactions } = useGlobalState();

	const totalIncomes = transactions
		.filter((transaction) => transaction.amount > 0)
		.reduce((acc, transaction) => (acc += transaction.amount), 0);

	const totalExpenses =
		transactions
			.filter((transaction) => transaction.amount < 0)
			.reduce((acc, transaction) => (acc += transaction.amount), 0) * -1;

	const totalExpensePorcentange = Math.round(
		(totalExpenses / totalIncomes) * 100
	);
	const totalIncomePorcentage = 100 - totalExpensePorcentange;

	return (
		<VictoryPie
			colorScale={["#ce0c0c", "#6abe1c"]}
			data={[
				{ x: "Gastos", y: totalExpensePorcentange },
				{ x: "Ingresos", y: totalIncomePorcentage },
			]}
			animate={{ duration: 2000 }}
			labels={({ datum }) => `${datum.y}%`}
			labelComponent={<VictoryLabel angle={45} style={{ fill: "white" }} />}
		/>
	);
};

export default ExpenseChart;
