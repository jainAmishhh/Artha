import Transaction from "../models/Transaction.js";


// ➤ Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const {
      description,
      merchant,
      amount,
      type,
      category,
      date,
      icon,
      color,
    } = req.body;

    const transaction = await Transaction.create({
      userId: req.user._id,
      description,
      merchant,
      amount,
      type,
      category,
      date,
      icon,
      color,
    });

    res.status(201).json({
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Get all transactions for logged-in user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Filter transactions (search, type, category, date-range)
export const filterTransactions = async (req, res) => {
  try {
    const { search = "", type = "All", category = "All", range = "All" } =
      req.query;

    const query = { userId: req.user._id };

    // Search filter
    if (search) {
      query.$or = [
        { description: { $regex: search, $options: "i" } },
        { merchant: { $regex: search, $options: "i" } }
      ];
    }

    // Type filter
    if (type !== "All") query.type = type;

    // Category filter
    if (category !== "All") query.category = category;

    // Time filter -> Today, 7 Days, 30 Days
    if (range !== "All") {
      const cutoff = new Date();
      if (range === "Today") cutoff.setDate(cutoff.getDate() - 1);
      if (range === "7 Days") cutoff.setDate(cutoff.getDate() - 7);
      if (range === "30 Days") cutoff.setDate(cutoff.getDate() - 30);

      query.date = { $gte: cutoff };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const oldTxn = await Transaction.findById(id);
    if (!oldTxn) return res.status(404).json({ error: "Transaction not found" });

    if (oldTxn.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    const updatedTxn = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Transaction updated successfully",
      data: updatedTxn,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const txn = await Transaction.findById(id);
    if (!txn) return res.status(404).json({ error: "Transaction not found" });

    if (txn.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    await txn.deleteOne();

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
