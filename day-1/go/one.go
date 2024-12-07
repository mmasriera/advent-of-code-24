package main

import (
	"aoc24/utils"
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func getLists() ([]int, []int) {
	lines := utils.ReadLines("../inputs/input-one.txt")

	list1 := []int{}
	list2 := []int{}

	for _, line := range lines {
		result := strings.Split(line, "   ")

		first, err := strconv.Atoi(result[0])
		if err != nil {
			panic(err)
		}

		list1 = append(list1, first)

		second, err := strconv.Atoi(result[1])
		if err != nil {
			panic(err)
		}

		list2 = append(list2, second)
	}

	return list1, list2
}

func sumDistances(list1 []int, list2 []int) int {
	sum := 0

	for i := range list1 {
		sum += utils.Abs(list1[i] - list2[i])
	}

	return sum
}

func main() {
	list1, list2 := getLists()

	slices.Sort(list1)
	slices.Sort(list2)

	fmt.Println(sumDistances(list1, list2)) // 1197984
}
