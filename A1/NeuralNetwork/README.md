# Neural Network MNIST Classifier

This project implements a Neural Network classifier for the MNIST dataset using Keras (TensorFlow).

## Prerequisites

Ensure you have Python installed. Install the required dependencies using:

```bash
../.venv/bin/pip install -r requirements.txt
```

## Running the Classifier

Run the python script:

```bash
../.venv/bin/python mnist_classifier.py
```

## Output

The script will:
1. Download and load the MNIST dataset.
2. Train a neural network model.
3. Print training progress and final test accuracy.
4. Generate a classification report (Precision, Recall, F1-score).
5. Save the following visualizations:
    - `training_history.png`: Plots for training/validation accuracy and loss.
    - `confusion_matrix.png`: A heatmap of the confusion matrix.
